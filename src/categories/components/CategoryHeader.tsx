import { Button, Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { PostCategory } from "../category-service/category.service";
type CategoryHeaderProps = {
  setNewCategoryCreated: (isCreated: boolean) => void;
  searchTerm: string;
  setSearchTerm: (src: string) => void;
  setLetter: (l: string) => void;
  setIsLoaded: (c: boolean) => void;
};

const CategoryHeader = ({
  setNewCategoryCreated,
  searchTerm,
  setSearchTerm,
  setLetter,
  setIsLoaded,
}: CategoryHeaderProps) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [name, setName] = useState("");
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  const CreateCategoryHandler = () => {
    PostCategory({ id: undefined, name }).then(
      () => {
        message.success("Category successfully created");
        setNewCategoryCreated(true);
      },

      (err) => console.error(err)
    );
    handleCancel();
    form.resetFields();
    setNewCategoryCreated(false);
  };
  return (
    <div>
      <>
        <h2>Categories</h2>
        <hr></hr>
        <Modal
          title="Create New Category"
          visible={visible}
          confirmLoading={confirmLoading}
          footer={false}
          keyboard={true}
          closable={false}
        >
          <Form
            onFinish={CreateCategoryHandler}
            form={form}
            autoComplete="off"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
          >
            <Form.Item
              name={"Name"}
              label="Category Name"
              rules={[
                { required: true, message: "Please input category name" },
                { min: 3, message: "Minimum name lenght is 3." },
              ]}
            >
              <Input
                onChange={(value) => setName(value.target.value)}
                value={name}
              />
            </Form.Item>
            <Button htmlType="submit" type="primary">
              Create
            </Button>
            <Button onClick={handleCancel} style={{ marginLeft: "1vh" }}>
              Cancel
            </Button>
          </Form>
        </Modal>
        <div className="pozadina">
          <button className="dugme" onClick={showModal}>
            Create new Category
          </button>
          <input
            type="search"
            className="searchinput"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setLetter("");
            }}
          ></input>
        </div>
      </>
    </div>
  );
};

export default CategoryHeader;
