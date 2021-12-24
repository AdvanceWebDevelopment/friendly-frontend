import { Icon } from "@iconify/react";
import * as React from "react";
import { Link } from "react-router-dom";
import classes from "./login-page.module.css";

export default function LoginPage() {
    const [isShown, setIsShown] = React.useState(false);
    const togglePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsShown((prev) => !prev);
    };
    return (
        <div className={classes["page-wrapper"]}>
            <div className={classes.container}>
                <form className={classes["login-form"]}>
                    <div className={classes["input-group"]}>
                        <label htmlFor="email" className={classes.labels}>
                            EMAIL
                        </label>
                        <input type="email" id="email" className={classes.fields} />
                    </div>
                    <div className={classes["input-group"]}>
                        <label htmlFor="pwd" className={classes.labels}>
                            MẬT KHẨU
                        </label>
                        <div className={classes["pwd-field"]}>
                            <input type={isShown ? "text" : "password"} id="pwd" className={classes.fields} />
                        </div>
                        <button className={classes["btn-toggle"]} onClick={togglePassword}>
                            <Icon
                                icon={isShown ? "ant-design:eye-filled" : "ant-design:eye-invisible-filled"}
                                className={classes["pwd-icon"]}
                            />
                        </button>
                    </div>
                    <div className={classes.redirects}>
                        <button type="submit" className={classes["btn-submit"]}>
                            Đăng nhập
                        </button>
                        <Link to={"*"} className={classes["forget-pwd"]}>
                            Quên mật khẩu
                        </Link>
                    </div>
                </form>
                <div className={classes["alternate-login"]}>
                    <div className={classes.guidance}>Hoặc Đăng Nhập Với</div>
                    <div className={classes["login-methods"]}>
                        <Icon icon="bi:facebook" className={classes.icons} />
                        <Icon icon="akar-icons:google-contained-fill" className={classes.icons} />
                        <Icon icon="akar-icons:github-fill" className={classes.icons} />
                    </div>
                </div>
            </div>
        </div>
    );
}
