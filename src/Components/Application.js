
import {BrowserRouter, Route , Switch} from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import CustomizedTables from './Table';


function Application() {
  
  const Home = () => {
    return(
      <CustomizedTables/>
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
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={LoginC} />
        <Route exact path="/signup" component={SignUpC}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Application;
