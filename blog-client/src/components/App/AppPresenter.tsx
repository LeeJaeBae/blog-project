interface IProps {
	isLoggedIn: boolean;
}
const AppPresenter: React.FC<IProps> = ({ isLoggedIn }) => {
	return <span>{isLoggedIn ? 'login' : 'have to login'}</span>;
};
export default AppPresenter;
