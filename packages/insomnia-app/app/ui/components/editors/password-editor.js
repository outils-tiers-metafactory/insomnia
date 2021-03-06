// @flow
import * as React from 'react';
import classnames from 'classnames';
import { autoBindMethodsForReact } from 'class-autobind-decorator';
import Button from '../base/button';
import OneLineEditor from '../codemirror/one-line-editor';
import { AUTOBIND_CFG } from '../../../common/constants';

type State = {
  showPassword: boolean,
};

type Props = {
  render: Function,
  getRenderContext: Function,
  nunjucksPowerUserMode: boolean,
  onChange: Function,
  password: string,
  disabled: boolean,
  isVariableUncovered: boolean,
  showAllPasswords: boolean,
};

@autoBindMethodsForReact(AUTOBIND_CFG)
class PasswordEditor extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  _handleShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
    const { showPassword } = this.state;
    const {
      password,
      disabled,
      showAllPasswords,
      handleRender,
      handleGetRenderContext,
      nunjucksPowerUserMode,
      isVariableUncovered,
      onChange,
    } = this.props;

    return (
      <>
        <div
          className={classnames('form-control form-control--underlined no-margin', {
            'form-control--inactive': disabled,
          })}>
          <OneLineEditor
            type={showAllPasswords || showPassword ? 'text' : 'password'}
            id="password"
            testId="password"
            onChange={onChange}
            defaultValue={password || ''}
            nunjucksPowerUserMode={nunjucksPowerUserMode}
            render={handleRender}
            getRenderContext={handleGetRenderContext}
            isVariableUncovered={isVariableUncovered}
          />
        </div>
        {!showAllPasswords && (
          <Button
            className="btn btn--super-duper-compact pointer"
            onClick={this._handleShowPassword}
            value={showPassword}
            testId="password-reveal">
            {showPassword ? <i className="fa fa-eye-slash" /> : <i className="fa fa-eye" />}
          </Button>
        )}
      </>
    );
  }
}

export default PasswordEditor;
