import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../Auth/auth-service/AuthService";
import Header from "../../Header";
import { useNavigate } from "react-router";
import { userChangePassword } from "../service/member-service";

const UserChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [id, setUserId] = useState("");
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    var user = getCurrentUser();
    setUserId(user.id);
  }, []);
  const PasswordChange = () => {
    userChangePassword({ id, oldPassword, newPassword, confirmPassword }).then(
      (x) => {
        if (x) {
          if (x.ErrorMessage) {
            setError(x.ErrorMessage);
          } else if (x.errors.OldPassword) {
            setError(x.errors.OldPassword);
          } else if (x.errors.NewPassword) {
            setError(x.errors.NewPassword);
          } else if (x.errors.ConfirmPassword) {
            setError(x.errors.ConfirmPassword);
          } else if (x.ErrorMessage) {
            setError(x.ErrorMessage);
          }
        } else {
          message.success("Password is changed successfully", 1);
          setTimeout(() => {
            navigate("/timesheets");
          }, 2000);
        }
      }
    );
  };
  return (
    <div className="container">
      <Header />
      <div style={{ marginLeft: 200 }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          style={{ marginTop: 100 }}
        >
          <Form.Item name="userid">
            <Input type="hidden" style={{ width: 300 }} value={id} />
          </Form.Item>
          <Form.Item
            label="Old Password"
            name="oldpassword"
            //rules={[{required:true}]}
          >
            <Input.Password
              style={{ width: 300 }}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <br />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newpassword"
            //rules={[{required:true}]}
          >
            <Input.Password
              style={{ width: 300 }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmpassword"
            //rules={[{required:true}]}
          >
            <Input.Password
              style={{ width: 300 }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br />
            <span style={{ color: "red" }}>{error}</span>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="button" onClick={PasswordChange}>
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UserChangePassword;
