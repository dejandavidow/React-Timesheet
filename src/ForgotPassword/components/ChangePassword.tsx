import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetpassword } from "../service/pwservice";
import { useLocation } from "react-router-dom";
const ChangePassword = () => {
  const [form] = useForm();
  const [password, setPassword] = useState("");
  const [confirmpassword, setconPassword] = useState("");
  const [token, setToken] = useState<string | null>("");
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const tokenQ = searchParams.get("token");
    setToken(tokenQ);
  }, []);

  const changePassword = () => {
    resetpassword({ password, confirmpassword }, token).then((res) => {
      if (res) {
        if (res.ErrorMessage) {
          setError(res.ErrorMessage);
        } else if (res.errors.Token) {
          setError(res.errors.Token);
        } else if (res.errors.Password) {
          setError(res.errors.Password);
        } else if (res.errors.ConfirmPassword) {
          setError(res.errors.ConfirmPassword);
        }
      } else {
        message.success("Password changed successfully", 1);
        setTimeout(() => {
          navigate("/timesheets");
        }, 2000);
      }
    });
  };
  return (
    <>
      <div className="mx-auto loginform">
        {error ? (
          <p style={{ color: "red", marginLeft: "100px" }}>{error + ""}</p>
        ) : null}
        <Form
          name="basic2"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={changePassword}
          form={form}
        >
          <Form.Item name="token">
            <Input type="hidden" value={token ? token : undefined}></Input>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Confirm password" name="confirmpassword">
            <Input.Password
              value={confirmpassword}
              onChange={(e) => setconPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ChangePassword;
