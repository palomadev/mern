import FetchRequest from './request';
import * as c from './constants';

class ApiModel {
    Login = credentials => FetchRequest(c.LOGIN, 'POST', null, credentials);
    //User
    GetUserToken = token => FetchRequest(c.GETCURRENT, 'GET', token);
    EmailValidation = (token, data) => FetchRequest(c.EMAILVALIDATION, 'POST', token, data);
    CreateUser = (token, data) => FetchRequest(c.CREATEUSER, 'POST', token, data);
    GetAllUser = token => FetchRequest(c.GETALLUSERS, 'GET', token);
    GetUser = (token, _id) => FetchRequest(c.GETUSER, 'POST', token, { _id });
    UpdateUser = (token, data) => FetchRequest(c.UPDATEUSER, 'PUT', token, data);
    DeleteUser = (token, _id) => FetchRequest(c.DELETEUSER, 'DELETE', token, { _id });
    GetAppUsers = (token, data) => FetchRequest(c.GETAPPUSERS, 'POST', token, data);
}

export default new ApiModel();