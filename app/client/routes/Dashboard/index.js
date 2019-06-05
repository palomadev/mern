import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wrapper from '../../components/Wrapper';
import styles from './index.scss';

class Dashboard extends Component {
    render() {
        return (
            <Wrapper>
                <span className={styles.test}>Hello, {this.props.account.name}</span>
            </Wrapper>
        );
    }
}

export default connect(s => ({ account: s.account }))(Dashboard);
