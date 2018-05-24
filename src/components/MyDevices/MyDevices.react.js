import '../StaticAppBar/StaticAppBar.css';
import $ from 'jquery';
import AppBar from 'material-ui/AppBar';
import Chat from 'material-ui/svg-icons/communication/chat';
import Cookies from 'universal-cookie';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Info from 'material-ui/svg-icons/action/info';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import React, { Component } from 'react';
import SignUpIcon from 'material-ui/svg-icons/action/account-circle';
import Settings from 'material-ui/svg-icons/action/settings';
import susiWhite from '../../images/susi-logo-white.png';
import Translate from '../Translate/Translate.react';

import { Link } from 'react-router-dom';

const cookies = new Cookies();

let Logged = (props) => (
    <div>
        <MenuItem primaryText="About"
            containerElement={<Link to="/overview" />}
            rightIcon={<Info />}
        />
        <MenuItem primaryText="Chat"
            containerElement={<Link to="/" />}
            rightIcon={<Chat />}
        />
        <MenuItem
            rightIcon={<Dashboard />}
        ><a
            style={{
                color: 'rgba(0, 0, 0, 0.87)',
                width: '140px',
                display: 'block'
            }}
            href="https://skills.susi.ai">Skills</a>
        </MenuItem>
        <MenuItem primaryText="Settings"
            containerElement={<Link to="/settings" />}
            rightIcon={<Settings />} />
        <MenuItem
            primaryText="Login"
            onTouchTap={this.handleLogin}
            rightIcon={<SignUpIcon />} />
    </div>
)
class MyDevices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseUrl: window.location.protocol + '//' + window.location.host + '/',
            login: false,
            signup: false,
            open: false,
            showOptions: false,
            anchorEl: null,
            openForgotPassword: false,
            leftGap: '0px'
        };
    }
    // Open app bar's drawer
    handleDrawer = () => this.setState({ openDrawer: !this.state.openDrawer });
    // Show options on touch tap
    showOptions = (event) => {
        var p = $('#rightIconButton').width();
        var screenWidth = $(window).width();
        this.setState({ leftGap: ((screenWidth - p) / 2) + p - 130 })
        event.preventDefault();
        this.setState({
            showOptions: true,
            anchorEl: event.currentTarget
        })
    }
    // Close options on touch tap
    closeOptions = () => {
      if(this.state.showOptions){
        this.setState({
            showOptions: false,
        });
      }
    };


    // Open login dialog and close signup dialog and options
     handleLogin = () => {
        this.setState({
            login: true,
            signup: false,
            showOptions: false,
            openForgotPassword: false
        })
        if (this.props.location.pathname === 'overview') {
            this.props.closeVideo();
        }
    }

    // Handle scroll events
    handleScroll = (event) => {
        let scrollTop = event.srcElement.body.scrollTop,
            itemTranslate = scrollTop > 60;
        if (itemTranslate) {
            this.closeOptions();
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        var didScroll;
        var lastScrollTop = 0;
        var delta = 5;
        var navbarHeight = $('header').outerHeight();
        $(window).scroll(function (event) {
            didScroll = true;
        });
        setInterval(function () {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 500);

        function hasScrolled() {
            var st = $(window).scrollTop();
            // Make sure they scroll more than delta
            if (Math.abs(lastScrollTop - st) <= delta) {
                return;
            }
            // If they scrolled down and are past the navbar, add class .nav-up.
            // This is necessary so you never see what is "behind" the navbar.
            if (st > lastScrollTop && st > navbarHeight + 400) {
                // Scroll Down
                $('header').removeClass('nav-down').addClass('nav-up');
            } else if (st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down');
            }
            lastScrollTop = st;
        }
        // Check Logged in
        if (cookies.get('loggedIn')) {
            Logged = (props) => (
                <div>
                    <MenuItem
                        containerElement={<Link to="/overview" />}
                        rightIcon={<Info />}
                    ><Translate text="About"/></MenuItem>
                    <MenuItem
                        containerElement={<Link to="/" />}
                        rightIcon={<Chat />}
                    ><Translate text="Chat"/></MenuItem>
                    <MenuItem
                        rightIcon={<Dashboard />}
                        href="https://skills.susi.ai"
                    ><Translate text="Skills"/>
                    </MenuItem>
                    <MenuItem
                        containerElement={<Link to="/settings" />}
                        rightIcon={<Settings />} ><Translate text="Settings"/>
                    </MenuItem>
                    <MenuItem
                        containerElement={<Link to="/logout" />}
                        rightIcon={<Exit />}><Translate text="Logout"/>
                    </MenuItem>
                </div>
            )
            return <Logged />
        }

        Logged = (props) => (
            <div>
                <MenuItem
                    containerElement={<Link to="/overview" />}
                    rightIcon={<Info />}
                ><Translate text="About"/>
                </MenuItem>
                <MenuItem
                    containerElement={<Link to="/" />}
                    rightIcon={<Chat />}
                > <Translate text="Chat"/></MenuItem>
                <MenuItem
                    rightIcon={<Dashboard />}
                    href="https://skills.susi.ai"
                ><Translate text="Skills"/>
                </MenuItem>
                <MenuItem
                    containerElement={<Link to="/settings" />}
                    rightIcon={<Settings />} >
                    <Translate text="Settings"/>
                </MenuItem>
                <MenuItem
                    onTouchTap={this.handleLogin}
                    rightIcon={<SignUpIcon />} >
                    <Translate text="Login"/>
                </MenuItem>
            </div>
        )
        return <Logged />
    }

    render() {

        var leftGap = this.state.leftGap;
        // Check the path to show or not to show top bar left menu
        var showLeftMenu = 'block';

        if(this.props.location.pathname==='/settings'){
            showLeftMenu='none';
        }
        let TopRightMenu = (props) => (
            <div onScroll={this.handleScroll} >
                <div>
                    <IconMenu
                        {...props}
                        iconButtonElement={
                            <IconButton
                                iconStyle={{ fill: 'white' }}><MoreVertIcon /></IconButton>
                        }
                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                        onTouchTap={this.showOptions}
                    >
                    </IconMenu>
                    <Popover
                        {...props}
                        style={{ float: 'left', position: 'relative', marginTop: '46px', marginLeft: leftGap }}
                        open={this.state.showOptions}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                        onRequestClose={this.closeOptions}
                    >
                        <Logged />
                    </Popover>

                </div>
            </div>
        );
        
        const themeBackgroundColor = this.props.settings && this.props.settings.theme==='dark'?'rgb(25, 50, 76)':'#4285f4';
        return (
            <div>
                <header className="nav-down" style={{backgroundColor: themeBackgroundColor}}>
                    <AppBar
                        id="headerSection"
                        className="topAppBar"

                        title={<div id="rightIconButton"><Link to='/' style={{ float: 'left', marginTop: '-10px',height:'25px',width:'122px' }}>
                            <img src={susiWhite} alt="susi-logo" className="siteTitle" /></Link></div>}
                        style={{
                            backgroundColor: themeBackgroundColor, height: '46px',
                            boxShadow: 'none'
                        }}
						            showMenuIconButton={showLeftMenu!=='none'}
                        onLeftIconButtonTouchTap={this.handleDrawer}
                        iconStyleLeft={{ marginTop: '-2px' }}
                        iconStyleRight={{ marginTop: '-2px' }}
                        iconElementRight={<TopRightMenu />}
                    />
                </header>
            </div>
        );
    }

}
MyDevices.propTypes = {
    history: PropTypes.object,
    settings: PropTypes.object,
    location: PropTypes.object,
    theme: PropTypes.object,
    closeVideo: PropTypes.func
}
export default MyDevices;
