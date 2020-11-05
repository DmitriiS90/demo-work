import React from 'react';
import styles from'./Header.module.css';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Avatar, Row, Col, Button } from 'antd';
import { UserOutlined} from '@ant-design/icons';

const Header = (props) => {
    const { Header } = Layout;
    return (
        <Header className="header">
            <div className="logo" />
            <Row>
                <Col span={20}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><NavLink to='/users'>Users</NavLink></Menu.Item>
                    </Menu>
                </Col>
                <Col span={4}>
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    <div className={styles.loginBlock}>
                        {props.isAuth
                            ? <div className={styles.name}>{props.login} - <Button type="primary" onClick={props.logout}>Log out</Button></div>
                            : <NavLink to={'/login'}>Login</NavLink>}
                    </div>
                </Col>
            </Row>
        </Header>
    )
}
export default Header;