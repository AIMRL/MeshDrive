import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { ButtonGroup, Button } from "reactstrap";
import FAIcon from "../FontAwesomeIcon/FontAwesomeIcon";
import { connect } from "react-redux";
import fetchRootFiles from "../../actions/files/fetchRootFiles";
import fetchFilesById from "../../actions/files/fetchFilesById";
import navigateTo from "../../actions/filenavigation/navigateTo";
import navigateToHome from "../../actions/filenavigation/navigateToHome";
import navigateToUpOneLevel from "../../actions/filenavigation/navigateToUpOneLevel";

import "./style.css";
import { ONEDRIVE } from "../../constants/strings";
import NewFolderButtonAndModal from "./NewFolderButtonAndModal";

class FileNavigation extends Component {
  handleHomeClick = () => {
    console.log("HOME");
    this.props.navigateToHome();
  };

  handleReloadClick = () => {
    const { historyStack } = this.props.fileNavigation;
    const top = historyStack[historyStack.length - 1];
    const { drive, parent, listFilesAccount } = top;

    if (top.parent === "root") {
      this.props.fetchRootFiles(drive, true);
    } else {
      this.props.fetchFilesById(drive, listFilesAccount, parent, true);
    }
  };
  handleUpOneLevelClick = () => {
    this.props.navigateToUpOneLevel();
  };

  render() {
    const { historyStack } = this.props.fileNavigation;

    const currentFolder = historyStack[historyStack.length - 1];
    const isHomeEnabled =
      historyStack.length > 0 && currentFolder.parent !== "root";
    const isReloadEnabled = historyStack.length > 0;
    const isUpOneLevelEnabled = historyStack.length > 1;
    const isNewFolderEnabled = true; //historyStack.length > 0;

    return (
      <div id="FileNavigation" className="file-navigation-bar">
        <ButtonGroup>
          <Button disabled={!isHomeEnabled} onClick={this.handleHomeClick}>
            <FAIcon icon="home" classes={["fa"]} /> Home
          </Button>
          <Button
            disabled={!isUpOneLevelEnabled}
            onClick={this.handleUpOneLevelClick}
          >
            <FAIcon icon="arrow-up" classes={["fa"]} /> Up One Level
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button onClick={this.handleReloadClick} disabled={!isReloadEnabled}>
            <FAIcon icon="sync-alt" classes={["fa"]} /> Reload
          </Button>
          <NewFolderButtonAndModal enabled={isNewFolderEnabled} />
          {/* 
          Will Implement this in future
          <Button>
            <FAIcon icon="check-square" classes={["fas"]} /> Select All
          </Button>
          <Button>
            <FAIcon icon="check-square" classes={["far"]} /> Unselect All
          </Button> */}
        </ButtonGroup>
      </div>
    );
  }
}
function mapStateToProps({ fileNavigation }) {
  return { fileNavigation };
}
export default connect(
  mapStateToProps,
  {
    fetchRootFiles,
    fetchFilesById,
    navigateTo,
    navigateToHome,
    navigateToUpOneLevel
  }
)(FileNavigation);
