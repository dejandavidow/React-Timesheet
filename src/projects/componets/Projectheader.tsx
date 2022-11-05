import { Button, Form, Input, message, Modal, Radio, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";
import { ClientModel } from "../../clients/model/clientModel";
import { getClientList } from "../../clients/service/client.service";
import { MemberModel } from "../../members/model/MemberModel";
import { getMembers } from "../../members/service/member-service";
import { ProjectModel } from "../model/ProjectModel";
import { PostProject } from "../service/project-service";
type ClientHeaderProps = {
  setNewClientCreated: (isCreated: boolean) => void;
  searchTerm: string;
  setSearchTerm: (src: string) => void;
  setLetter: (l: string) => void;
  setIsLoaded: (c: boolean) => void;
};
const Projectheader = (props: ClientHeaderProps) => {
  const [form] = useForm();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [projectName, setprojectName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [archive, setArchive] = useState("");
  const [memberId, setmemberId] = useState("");
  const [clientId, setclientId] = useState("");
  const [members, setMembers] = useState<MemberModel[]>([]);
  const [clients, setClients] = useState<ClientModel[]>([]);
  const { Option } = Select;
  const handleClose = () => {
    setShow(false);
    form.resetFields();
  };
  const CreateClientHandler = () => {
    const request: ProjectModel = {
      id: undefined,
      projectName,
      description,
      status,
      archive,
      memberId,
      clientId,
    };
    PostProject(request).then((res) => {
      props.setNewClientCreated(true);
      message.success("Project created successfully");
    });
    handleClose();
    props.setNewClientCreated(false);
  };
  const getMembersHandler = () => {
    getMembers().then((data) => setMembers(data));
  };
  const getClientsHandler = () => {
    getClientList().then((data) => setClients(data));
  };
  return (
    <>
      <h2>Projects</h2>
      <hr></hr>
      <Modal
        title="Create New Project"
        visible={show}
        footer={false}
        keyboard={true}
        closable={false}
      >
        <Form
          form={form}
          autoComplete="off"
          onFinish={CreateClientHandler}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            name="projectName"
            label="Project name"
            rules={[
              { required: true, message: "Project name is required." },
              {
                type: "string",
                min: 3,
                message: "Name must be atleast 3 characters.",
              },
            ]}
          >
            <Input
              onChange={(value) => setprojectName(value.target.value)}
              value={projectName}
            />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input
              onChange={(value) => setDescription(value.target.value)}
              value={description}
            />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please choose status" }]}
          >
            <Radio.Group
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <Radio value="active">Active</Radio>
              <Radio value="inactive">Inactive</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="archive" label="Archive">
            <Radio
              value="archived"
              onChange={(e) => setArchive(e.target.value)}
            >
              Archived
            </Radio>
          </Form.Item>
          <Form.Item
            name="member"
            label="Member"
            rules={[{ required: true, message: "Please choose member" }]}
          >
            <Select
              onClick={getMembersHandler}
              placeholder="Select team member"
              allowClear
              onChange={(value) => setmemberId(value)}
            >
              {members.map((member) => (
                <Option key={member.id} value={member.id}>
                  {member.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="client"
            label="Client"
            rules={[{ required: true, message: "Please choose client" }]}
          >
            <Select
              placeholder="Select client"
              allowClear
              onClick={getClientsHandler}
              onChange={(value) => setclientId(value)}
            >
              {clients.map((client) => (
                <Option key={client.id} value={client.id}>
                  {client.clientName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Button htmlType="submit" type="primary">
            Create
          </Button>
          <Button onClick={handleClose} style={{ marginLeft: "1vh" }}>
            Close
          </Button>
        </Form>
      </Modal>
      <div className="pozadina">
        <button className="dugme" onClick={handleShow}>
          Create new Project
        </button>
        <input
          type="search"
          className="searchinput"
          placeholder="Search"
          value={props.searchTerm}
          onChange={(e) => {
            props.setSearchTerm(e.target.value);
            props.setLetter("");
          }}
        ></input>
      </div>
    </>
  );
};

export default Projectheader;
