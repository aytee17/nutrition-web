import React, { Component, Fragment } from "react";
import Reaptcha from "reaptcha";

export default function withReacaptcha(WrappedComponent) {
	return class extends Component {
		constructor(props) {
			super(props);
			this.captcha = React.createRef();
			this.state = this.defaultState = { recaptchaToken: undefined };
		}

		onVerify = recaptchaToken => this.setState({ recaptchaToken });

		getRecaptchaToken = async () => {
			await this.captcha.current.execute();

			return new Promise((resolve, reject) => {
				const id = setInterval(() => {
					const { recaptchaToken } = this.state;
					if (recaptchaToken) {
						clearInterval(id);
						this.setState(this.defaultState);
						this.captcha.current.reset();
						resolve(recaptchaToken);
					}
				}, 50);
			});
		};

		render() {
			return (
				<Fragment>
					<Reaptcha
						ref={this.captcha}
						sitekey="6LeYL1cUAAAAAEipH_xTd_P8pYi2pUl4F2q6sL7q"
						onVerify={this.onVerify}
						size="invisible"
					/>
					<WrappedComponent
						getRecaptchaToken={this.getRecaptchaToken}
						{...this.props}
					/>
				</Fragment>
			);
		}
	};
}
