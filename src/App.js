import { BrowserRouter, Switch, Route, Redirect, useRouteMatch, useParams, NavLink } from "react-router-dom";


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/users" component={UsersLayout}/>
          <Route exact path="/" component={HomePage}/>
          <Redirect to="/"/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

const HomePage = () => {
  return (
    <div>
      <h2>Home</h2>
      <NavLink to="/users">To UserListPage</NavLink>
    </div>
  );
};
const UsersLayout = () => {
  const {path} = useRouteMatch();
  return (
  <>
    <h2>UsersLayout</h2>
    <Switch>
      <Route path={path+"/:userId/profile"} component={UserInfoPage}/>
      <Route path={path+"/:userId/edit"} component={EditUserPage}/>
      <Route path={path} exact component={UsersListPage}/>
      <Redirect from={path+"/:userId"} to={path+"/:userId/profile"}/>
    </Switch>
  </>
  );
};
const UsersListPage = () => {
  const {path} = useRouteMatch();
  const users = [
    {name: "User1", id:1},
    {name: "User2", id:2},
    {name: "User3", id:3},
    {name: "User4", id:4},
    {name: "User5", id:5}
  ];
  return (
    <>
      <h2>UsersListPage</h2>
      <NavLink to="/">To HomePage</NavLink>
      <ul>
        { Object.values(users).map((u) => {
          return <li key={u.id} >
            <NavLink to={`${path}/${u.id}`}>{u.name}</NavLink>
          </li>
        }) }
      </ul>
    </>
  );
};
const UserInfoPage = () => {
  const {userId} = useParams();
  return (
    <>
      <h2>UserInfoPage</h2>
      <p>UserID: {userId}</p>
      <NavLink to="/users">To UserListPage</NavLink>
      <hr />
      <NavLink to={`/users/${userId}/edit`}>To EditPage</NavLink>
    </>
  );
};
const EditUserPage = () => {
  const {userId} = useParams();
  const getAnotherId = (userId) => {
    if (userId === "5") {
      return 1;
    }
    return +userId + 1;
  };
  return (
    <>
      <h2>EditUserPage</h2>
      <NavLink to="/users">To UserListPage</NavLink>
      <hr />
      <NavLink to={`/users/${userId}/profile`}>To User Profile</NavLink>
      <hr />
      <NavLink to={`/users/${getAnotherId(userId)}/profile`}>To Another User Profile</NavLink>
    </>
  );
};

export default App;
