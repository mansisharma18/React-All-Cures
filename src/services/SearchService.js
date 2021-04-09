import axios from 'axios';

const SEARCH_API_URL = 'http://localhost:8080/cures/SearchActionController';

class SearchService {
    
    getResponse(){
        axios.get(Search_API_URL);
    }

}

export default new SearchService();