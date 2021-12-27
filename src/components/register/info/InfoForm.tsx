import * as React from "react";
import InputField from "../../common/input-field/InputField";
import ToggleInputField from "../../common/input-field/toggle/ToggleInputField";
import Label from "../../common/label/Label";
import NextButton from "../../forgot-password/btn-next/NextButton";
import DropdownInputField from "../dropdown/DropdownInput";
import classes from "./InfoForm.module.css";
export interface InfoFormProps {
    goToNextStep: () => void;
}

export default function InfoForm({ goToNextStep }: InfoFormProps) {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [city, setCity] = React.useState("");
    const [district, setDistrict] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPwd, setConfirmPwd] = React.useState("");
    const [isAgree, setIsAgree] = React.useState(false);
    const [isRobot, setIsRobot] = React.useState(true);
    const [dummyFlag, setDummyFlag] = React.useState(true);

    const onSubmitHandler = () => {
        if (dummyFlag) {
            console.log("Submit");
            goToNextStep();
        }
    };

    const receiveFirstName = (fName: string) => {
        setFirstName(fName);
    };

    const receiveLastName = (lName: string) => {
        setLastName(lName);
    };

    const receiveCountry = (country: string) => {
        setCountry(country);
    };

    const receiveCity = (city: string) => {
        setCity(city);
    };

    const receiveDistrict = (district: string) => {
        setDistrict(district);
    };

    const receiveAddress = (address: string) => {
        setFirstName(address);
    };

    const receiveEmail = (email: string) => {
        setEmail(email);
    };

    const receivePassword = (password: string) => {
        setPassword(password);
    };

    const receiveConfirmPassword = (confirmPassword: string) => {
        setConfirmPwd(confirmPassword);
    };

    return (
        <form className={classes.form}>
            <div className={classes["input-group"]}>
                <div className={classes["name-wrapper"]}>
                    <div className={classes["last-name"]}>
                        <Label htmlFor="last-name" content="Họ" />
                        <InputField id="last-name" type="text" receiveValue={receiveLastName} />
                    </div>
                    <div className={classes["first-name"]}>
                        <Label htmlFor="first-name" content="Tên" />
                        <InputField id="first-name" type="text" receiveValue={receiveFirstName} />
                    </div>
                </div>
                <div className={classes["address-wrapper"]}>
                    <div className={classes["country"]}>
                        <Label htmlFor="country" content="Quốc gia" />
                        <DropdownInputField options={["Vietnam", "Thailand", "Korea"]} receiveValue={receiveCountry} />
                    </div>
                    <div className={classes["city"]}>
                        <Label htmlFor="city" content="Thành phố" />
                        <DropdownInputField options={["Hanoi", "Bangkok", "Seoul"]} receiveValue={receiveCity} />
                    </div>
                    <div className={classes["district"]}>
                        <Label htmlFor="district" content="Quận/huyện" />
                        <DropdownInputField
                            options={["Tân Phú", "Bình Tân", "Tân Bình"]}
                            receiveValue={receiveDistrict}
                        />
                    </div>
                    <div className={classes["address"]}>
                        <Label htmlFor="address" content="Số nhà, tên đường" />
                        <InputField id="address" type="text" receiveValue={receiveAddress} />
                    </div>
                </div>
                <div className={classes["single-input-wrapper"]}>
                    <Label htmlFor="email" content="Email" />
                    <InputField id="email" type="email" receiveValue={receiveEmail} />
                </div>
                <div className={classes["single-input-wrapper"]}>
                    <Label htmlFor="password" content="Mật khẩu" />
                    <ToggleInputField id="password" receiveValue={receivePassword} />
                </div>
                <div className={classes["single-input-wrapper"]}>
                    <Label htmlFor="confirm-pwd" content="Nhập lại mật khẩu" />
                    <ToggleInputField id="confirm-pwd" receiveValue={receiveConfirmPassword} />
                </div>
                <NextButton onSubmit={onSubmitHandler} />
            </div>
        </form>
    );
}
