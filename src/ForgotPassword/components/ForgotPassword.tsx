import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";
import { forgotpassword } from "../service/pwservice";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const [form] = useForm();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();
  const checkEmail = () => {
    forgotpassword({ email }).then((err) => {
      if (err) {
        setError(err.ErrorMessage);
      } else {
        navigate("/");
        message.success("Reset link is sent,check your email adress.", 2);
      }
    });
  };
  return (
    <div className="container">
      <h2
        className=""
        style={{ marginTop: 30, color: "rgba(0,0,0,0.5)", textAlign: "center" }}
      >
        Forgot Password
      </h2>
      <div className="mx-auto loginform">
        {error ? (
          <p style={{ color: "red", marginLeft: "100px" }}>{error}</p>
        ) : null}
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          onFinish={checkEmail}
          autoComplete="off"
          title="[asd"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email is required." }]}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email adress"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => navigate("/timesheets")}
          >
            Back
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
