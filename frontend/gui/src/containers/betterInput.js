import React from 'react';
import { InputNumber } from 'antd';
import './index.css';

export class BetterInputNumber extends React.Component {
    render() {
        if (this.props.addonAfter) {
            return (
                <>
                    <InputNumber style={{ fontFamily: 'Camphor', fontSize: '16px', fontWeight: 300, verticalAlign: 'middle', borderBottomRightRadius: 0, borderTopRightRadius: 0 }} {...this.props} />
                    <div className="ant-input-group-addon" style={{ paddingTop: '2px', verticalAlign: 'middle', display: 'inline-table', lineHeight: '24px', height: '32px' }}>{this.props.addonAfter}</div>
                </>
            );
        } else {
            return (
                <InputNumber {...this.props} />
            );
        }
    }
}