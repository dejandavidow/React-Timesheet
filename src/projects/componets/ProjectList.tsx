import { Button, Form, Input, message, Modal, Radio, Select, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { ClientModel } from "../../clients/model/clientModel";
import { getClientList } from "../../clients/service/client.service";
import { MemberModel } from "../../members/model/MemberModel";
import { getMembers } from "../../members/service/member-service";
import { ProjectModel } from "../model/ProjectModel";
import {
  countProjects,
  getProjects,
  UpdateProject,
} from "../service/project-service";
import OneProject from "./OneProject";
type ClientListProps = {
  newClientCreated: boolean;
  searchTerm: string;
  setNewClientCreated: (isCreated: boolean) => void;
  clientDeleted: boolean;
  setClientDeleted: (isDeleted: boolean) => void;
  clientUpdated: boolean;
  setClientUpdated: (isUpdated: boolean) => void;
  setSearchTerm: (c: string) => void;
  letter: string;
  setLetter: (l: string) => void;
  setIsLoaded: (C: boolean) => void;
  isLoaded: boolean;
};
const ProjectList = (props: ClientListProps) => {
  const [form] = useForm();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    form.resetFields();
  };
  const handleShow = () => {
    setShow(true);
    getMembers().then((x) => setMembers(x));
    getClientList().then((x) => setClients(x));
  };
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [pageCount, setpageCount] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [members, setMembers] = useState<MemberModel[]>([]);
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [projectName, setprojectName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [archive, setArchive] = useState("");
  const [memberId, setmemberId] = useState<string>("");
  const [clientId, setclientId] = useState<string>("");
  const [id, setId] = useState<string | undefined>(undefined);
  const [error, setError] = useState<any>(null);
  const { Option } = Select;
  useEffect(() => {
    getProjects(props.searchTerm, props.letter, pageNumber, pageSize).then(
      (data) => {
        props.setIsLoaded(true);
        setProjects(data);
      },
      (err) => {
        props.setIsLoaded(true);
        setError(err);
      }
    );
    countProjects(props.searchTerm, props.letter).then((data) =>
      setpageCount(Math.ceil(data / pageSize))
    );
  }, [
    props.newClientCreated,
    props.searchTerm,
    props.clientDeleted,
    props.clientUpdated,
    pageNumber,
    props.letter,
  ]);
  const handlePageClick = (e: { selected: number }) => {
    setPageNumber(e.selected + 1);
  };

  const childToParent = (client: any) => {
    handleShow();
    setId(client.id);
    setprojectName(client.projectName);
    setDescription(client.description);
    setStatus(client.status);
    setArchive(client.archive);
    setmemberId(client.memberDTO.id);
    setclientId(client.clientDTO.id);
  };
  const updateClientHandler = () => {
    UpdateProject(
      { id, projectName, description, status, archive, memberId, clientId },
      id
    ).then((res) => {
      props.setClientUpdated(true);
      message.success("Project updated successfully");
    });
    props.setClientUpdated(false);
    handleClose();
  };
  const handleFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.setSearchTerm("");
    const button: HTMLButtonElement = event.currentTarget;
    props.setLetter(button.value);
  };
  if (error) {
    return <div>{error.message}</div>;
  } else if (!props.isLoaded) {
    return <Spin tip="Loading..." style={{ margin: "5vh 60vh" }} />;
  }
  return (
    <>
      <div className="container">
        <div className="filteri">
          <button
            type="button"
            onClick={handleFilter}
            value="a"
            className="filter-buttons"
          >
            A
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="b"
            className="filter-buttons"
          >
            B
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="c"
            className="filter-buttons"
          >
            C
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="d"
            className="filter-buttons"
          >
            D
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="e"
            className="filter-buttons"
          >
            E
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="f"
            className="filter-buttons"
          >
            F
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="g"
            className="filter-buttons"
          >
            G
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="h"
            className="filter-buttons"
          >
            H
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="i"
            className="filter-buttons"
          >
            I
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="j"
            className="filter-buttons"
          >
            J
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="k"
            className="filter-buttons"
          >
            K
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="l"
            className="filter-buttons"
          >
            L
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="m"
            className="filter-buttons"
          >
            M
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="n"
            className="filter-buttons"
          >
            N
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="o"
            className="filter-buttons"
          >
            O
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="p"
            className="filter-buttons"
          >
            P
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="q"
            className="filter-buttons"
          >
            Q
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="r"
            className="filter-buttons"
          >
            R
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="s"
            className="filter-buttons"
          >
            S
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="t"
            className="filter-buttons"
          >
            T
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="u"
            className="filter-buttons"
          >
            U
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="v"
            className="filter-buttons"
          >
            V
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="w"
            className="filter-buttons"
          >
            W
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="x"
            className="filter-buttons"
          >
            X
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="y"
            className="filter-buttons"
          >
            Y
          </button>
          <button
            type="button"
            onClick={handleFilter}
            value="z"
            className="filter-buttons"
          >
            Z
          </button>
        </div>
        <ListGroup className="listgroup">
          {projects.map((project) => (
            <OneProject
              key={project.id}
              project={project}
              handleShow={handleShow}
              childToParent={childToParent}
              setClientDeleted={props.setClientDeleted}
              setIsLoaded={props.setIsLoaded}
            />
          ))}
        </ListGroup>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={pageSize}
          pageCount={pageCount}
          previousLabel="<previous"
          className="pagination"
        />
        <Modal
          title="Update project"
          visible={show}
          footer={false}
          keyboard={true}
          closable={false}
        >
          <Form
            form={form}
            onFinish={updateClientHandler}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item label="Project Name">
              <Input
                value={projectName}
                onChange={(e) => setprojectName(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Description">
              <Input
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </Form.Item>
            <Form.Item label="Status">
              <Radio.Group
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <Radio value="active">Active</Radio>
                <Radio value="inactive">Inactive</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Archive">
              <Radio
                value={archive}
                onChange={(e) => setArchive(e.target.value)}
              >
                Archived
              </Radio>
            </Form.Item>
            <Form.Item label="Member" rules={[{ required: true }]}>
              <Select
                value={memberId}
                placeholder="Select team member"
                allowClear
                onChange={(e: any) => setmemberId(e.target.value)}
                //onClick={getMembersHandler}
              >
                {members.map((member) => (
                  <Option key={member.id} value={member.id}>
                    {member.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Client" rules={[{ required: true }]}>
              <Select
                placeholder="Select client"
                allowClear
                value={clientId}
                onSelect={(e: any) => setclientId(e.target.value)}
                //onClick={getClientsHandler}
              >
                {clients.map((client) => (
                  <Option key={client.id} value={client.id}>
                    {client.clientName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Button htmlType="submit" type="primary">
              Update
            </Button>
            <Button onClick={handleClose} style={{ marginLeft: "1vh" }}>
              Close
            </Button>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default ProjectList;
