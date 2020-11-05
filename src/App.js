import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Nav from './components/Nav/Nav';
import {Route, withRouter} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/login/login';
import { initializeApp } from './redux/app-reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/preloader/preloader';
import { NavLink } from 'react-router-dom';

import { Layout, Menu, Breadcrumb,Avatar, Row, Col } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if(!this.props.initializated) {
      return <Preloader/>
    }
    
    return (
      <Layout>
        <HeaderContainer />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['2']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
                  <Menu.Item key="1"><NavLink to='/profile'>Profile</NavLink></Menu.Item>
                  <Menu.Item key="2"><NavLink to='/dialogs'>Masseges</NavLink></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<UserOutlined />} title="Users">
                  <Menu.Item key="3"><NavLink to='/users'>Users</NavLink></Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<LaptopOutlined />} title="subnav">
                  <Menu.Item key="4"><NavLink to='/news'>News</NavLink></Menu.Item>
                  <Menu.Item key="5"><NavLink to='/music'>Music</NavLink></Menu.Item>
                  <Menu.Item key="6"><NavLink to='/settings'>Settings</NavLink></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
              <Route path='/dialogs' render={() => <DialogsContainer />} />
              <Route path='/users' render={() => <UsersContainer />} />
              <Route path='/news' render={() => <News />} />
              <Route path='/music' component={Music} />
              <Route path='/settings' component={Settings} />
              <Route path='/login' render={() => <Login />} />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>demo-project</Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  initializated: state.app.initializated
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App)

