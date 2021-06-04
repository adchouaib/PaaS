import {Component} from "react";
import {BrowserRouter, Route , Switch} from "react-router-dom";
import axios from 'axios';
import Login from './Login';
import SignUp from './SignUp';
import CustomizedTables from './Table';
import { AuthProvider } from "../auth/auth";


class Application extends Component{
  constructor() {
    super();
    this.state = {
	data:[]
     };
  }
  componentDidMount(){
    //https://us-central1-serverless-tp-1.cloudfunctions.net/tpfaas
    axios.get('https://us-central1-serverless-tp-1.cloudfunctions.net/tpcicd')
    .then((response) => {
    const resData = response.data;
    resData.img = resData.img.substring(3);
    console.log(resData);
    this.setState({data:[response.data]})
    });
  }
  
  render(){
  const Home = () => {
    return(
      <CustomizedTables data={this.state.data}/>
    );
  }

  const SignUpC = () =>{
    return(
      <SignUp />
    );
  }

  const LoginC = () =>{
    return(
      <Login />
    );
  }
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/login" component={LoginC} />
          <Route exact path="/signup" component={SignUpC}/>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );}
}

export default Application;
