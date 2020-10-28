import http from 'axios/lib/adapters/http';
import axios from 'axios';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'jest-localstorage-mock';

// axios의 어댑터로 http를 설정하면
// nock이 가로챌 수 있다.
axios.defaults.adapter = http;

// enzyme snapshot test
configure({ adapter: new Adapter() });
