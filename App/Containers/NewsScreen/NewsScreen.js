// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
} from 'native-base';
import NewsActions from '../../Redux/NewsRedux';
import HeaderBar from '../../Components/HeaderBar';
import SearchBar from '../../Components/SearchBar';
import GridList from './NewsScreenComponents';

const PAGE_START = 1;
const PAGE_STEP = 1;
const PAGE_SIZE = 10;
const DEFAULT_COUNTRY = 'us';

const STATIC_TEXT = {
  screenTitle: 'News',
};

const INITIAL_PARAMS = {
  country: DEFAULT_COUNTRY,
  page: PAGE_START,
  pageSize: PAGE_SIZE,
};

type Props = {
  fetching: boolean,
  newsList: Array,
  totalResults: number,
  fetchingAgency: boolean,
  errorAgency: Object,
  agency: Array,
  fetchNews: Function,
  fetchAgency: Function,
};

type State = {
  news: Array,
  isFetchingMore: boolean,
  params: Object,
  agencyList: Array,
  initialSearch: boolean,
};

class NewsScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      isFetchingMore: false,
      params: INITIAL_PARAMS,
      agencyList: [],
      initialSearch: false,
    };

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleActionSheetSelected = this.handleActionSheetSelected.bind(this);
  }

  componentDidMount() {
    this._refreshByParams();
    this._handleFetchAgency();
  }

  componentWillReceiveProps(nextProps) {
    const { news, isFetchingMore } = this.state;
    if (nextProps.newsList !== this.props.newsList) {
      const newNews = nextProps.newsList || [];
      this.setState({
        news: isFetchingMore ? [...news, ...newNews] : newNews,
        isFetchingMore: false,
      });
    }
    if (nextProps.agency && nextProps.agency.length > 0) {
      this._handleFilterList(nextProps.agency);
    }
  }

  _handleFetchAgency = async () => {
    const { fetchAgency } = this.props;
    await fetchAgency({
      country: DEFAULT_COUNTRY,
    });
  }

  _handleFilterList(agency: Array) {
    const agencyNameList = [];
    agency.map(item => agencyNameList.push(item.name));
    this.setState({
      agencyList: agencyNameList,
    });
  }

  _refreshByParams(newParams: Object) {
    const { fetchNews } = this.props;
    const payload = {
      ...INITIAL_PARAMS,
      ...newParams,
    };

    this.setState({
      news: [],
      params: payload,
    });

    fetchNews(payload);
  }

  _handleFetchMoreNews() {
    const { fetchNews, totalResults } = this.props;
    const { news, params, isFetchingMore } = this.state;
    if (!isFetchingMore && totalResults > news.length) {
      const payload = {
        ...params,
        page: params.page + PAGE_STEP,
      };
      this.setState({
        params: payload,
        isFetchingMore: true,
      }, () => {
        fetchNews(payload);
      });
    }
  }

  handleSearchSubmit(searchText) {
    if (searchText) {
      this._refreshByParams({
        country: '',
        q: searchText,
      });
    }
  }

  handleActionSheetSelected(agencyIndex) {
    const { agency } = this.props;
    const { agencyList } = this.state;
    const agencyItem = agency.find(item => item.name === agencyList[agencyIndex]);
    if (agencyItem) {
      this.setState({
        news: [],
        initialSearch: true,
      }, () => {
        this._refreshByParams({
          country: '',
          sources: agencyItem.id,
        });
        this.setState({
          initialSearch: false,
        });
      });
    }
  }

  render() {
    const {
      fetching,
      fetchingAgency,
      errorAgency,
    } = this.props;
    const {
      agencyList,
      news,
      initialSearch,
    } = this.state;
    return (
      <Container>
        <HeaderBar
          title={STATIC_TEXT.screenTitle}
          filterActive={!fetchingAgency && !errorAgency}
          filterList={agencyList}
          onFilterItemPressFn={index => this.handleActionSheetSelected(index)}
        />
        <SearchBar
          initialSearch={initialSearch}
          onSubmitEditing={searchText => this.handleSearchSubmit(searchText)}
        />
        <GridList
          data={news}
          fetching={fetching}
          onPullFn={() => this._refreshByParams()}
          loadMoreFn={() => this._handleFetchMoreNews()}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.news.fetching,
  error: state.news.error,
  newsList: state.news.newsList,
  totalResults: state.news.totalResults,
  fetchingAgency: state.news.fetchingAgency,
  errorAgency: state.news.errorAgency,
  agency: state.news.agency,
});

const mapDispatchToProps = dispatch => ({
  fetchNews: payload => dispatch(NewsActions.getNews(payload)),
  fetchAgency: payload => dispatch(NewsActions.getAgency(payload)),
});

const ConnectedNewsScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsScreen);

export {
  ConnectedNewsScreen as default,
  NewsScreen,
};
