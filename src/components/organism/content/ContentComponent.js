import React from "react";
import styled from "styled-components";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import SendIcon from "@mui/icons-material/Send";
import GroupIcon from "@mui/icons-material/Group";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from "react-router-dom";

const ContentComponent = ({ Page }) => {
  const navigate = useNavigate();
  const Menus = [
    { Icon: DashboardIcon, nama: "Dashboard", uri: "/" },
    { Icon: ContactPageIcon, nama: "Contacts", uri: "/contact" },
    { Icon: WhatsAppIcon, nama: "Send Message", uri: "/send_message" },
    { Icon: ReplyAllIcon, nama: "Auto Reply", uri: "/bot" },
    { Icon: SendIcon, nama: "Broadcast", uri: "/Broadcast" },
    { Icon: GroupIcon, nama: "Group", uri: "/group" },
    { Icon: ReportGmailerrorredIcon, nama: "Report", uri: "/report" },
    { Icon: AdminPanelSettingsIcon, nama: "Settings", uri: "/settings" },
  ];

  return (
    <Wrapper>
      <SideMenu>
        {Menus.map((menu, id) => {
          return (
            <ListMenu key={id} onClick={() => navigate(menu.uri)}>
              <menu.Icon
                style={{ fontSize: 16, marginLeft: 10, marginRight: 10 }}
              />
              {menu.nama}
            </ListMenu>
          );
        })}
      </SideMenu>
      <Content>
        <Page />
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
`;

const SideMenu = styled.div`
  border-right: solid 1px #ccc;
  flex: 0.2;
  float: left;
  background: #101a32;
`;

const Content = styled.div`
  flex: 0.8;
  background-color: whitesmoke;
`;

const ListMenu = styled.div`
  display: flex;
  align-items: center;
  color: #b7bac1;
  width: 100%;
  padding: 16px;
  font-size: 0.89em;
  cursor: pointer;
  :hover {
    zoom: 1.05;
    color: white;
  }
`;

export default ContentComponent;
