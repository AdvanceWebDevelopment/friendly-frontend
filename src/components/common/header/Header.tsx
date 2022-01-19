import * as React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hook";
import { selectIsAuthenticated } from "../../../app/reducers/auth-slice";
import { selectUserAvatar, selectUserName } from "../../../app/reducers/user-slice";
import { apiRoute } from "../../../constants/api-routes";
import CategoryButton from "../../category/CategoryButton";
import NotificationButton from "../../notification/NotificationButton";
import ProfileButton from "../../profile/ProfileButton";
import SearchBar from "../../search-bar/SearchBar";
import LoginButton from "../btn-log-in/LoginButton";
import RegisterButton from "../btn-register/RegisterButton";
import classes from "./Header.module.css";

export default function Header() {
    const navigate = useNavigate();
    const [isLogout, setIsLogout] = React.useState(false);
    const isLogin = useAppSelector(selectIsAuthenticated);
    const userName = useAppSelector(selectUserName);
    const userAvatar = useAppSelector(selectUserAvatar);

    React.useEffect(() => {
        if (isLogin) {
            setIsLogout(false);
        } else {
            setIsLogout(true);
        }
    }, [isLogin]);

    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <a href="#" onClick={() => navigate(apiRoute.HOME)}>
                    <div className={classes.logo}></div>
                </a>
                <div className={classes.home} onClick={() => navigate("/")}>
                    Trang chủ
                </div>
                <CategoryButton />
                <SearchBar />
                {!isLogout && <ProfileButton name={userName ? userName : ""} avatar={userAvatar ? userAvatar : ""} />}
                {!isLogout && <NotificationButton />}
                {isLogout && (
                    <div className={classes.redirect}>
                        <LoginButton />
                        <RegisterButton />
                        {/* <Button onClick={() => navigate(`/`)} /> */}
                    </div>
                )}
            </div>
        </header>
    );
}
