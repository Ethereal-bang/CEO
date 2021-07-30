import React from 'react'
import { Route, Link, Redirect } from "react-router-dom"
import { Layout, Menu, Button, Modal } from 'antd';
import Application from "./Application"
import Company from './Company';
import Files from './Files';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  //TeamOutlined,
  //UserOutlined,
  PoweroffOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css'
import "../style/All.css"
import localStorage_login from '../../../guard/localStorage'


const { Sider } = Layout;

export default class SiderDemo extends React.Component {
    state = {
      collapsed: false,
      isModalVisible: false
    };
  
    onCollapse = collapsed => {
      console.log(collapsed);
      this.setState({ collapsed });
    };
    //点击退出登录打开询问面板
    open_model = () => {
      this.setState({ isModalVisible: true })
    }
    //退出提示点击确定跳转到登录页面并且修改用户权限
    handleOk = () => {
      this.setState({ isModalVisible: false })
      localStorage_login.removeLogin_auth()
      this.props.history.replace("/login")
    }
    //退出提示点击取消则关闭询问框
    handleCancel = () => {
      this.setState({ isModalVisible: false })
    }
  
    render() {
      const { collapsed } = this.state;
      return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} theme="light">
            <div className="logo" />
            <Menu defaultSelectedKeys={['1']} mode="inline" theme="light">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                <Link to="/user_student/application">
                  申请
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to="/user_student/company">
                  公司
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<FileOutlined />}>
              <Link to="/user_student/files">
                  文件
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <header id="header">
              <span>CEO 李富莲</span>
              <Button type="primary" size="large" shape="round" icon={<PoweroffOutlined />} onClick={this.open_model}>退出登录</Button>
            </header>
            <Modal title="退出登录提示" cancelText="取消" okText="确定" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
              <p>您确定要退出吗？</p>
            </Modal>
            <section id="section">
              <Route path="/user_student/application" component={Application} />
              <Route path="/user_student/company" component={Company}/>
              <Route path="/user_student/files" component={Files}/>
              <Redirect to="/user_student/application"/>
            </section>
            <footer id="footer">
              版权所有 极客工作室
            </footer>
          </Layout>
        </Layout>
      );
    }
  }