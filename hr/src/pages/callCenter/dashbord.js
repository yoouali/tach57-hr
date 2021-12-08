import { useState, useEffect, Text } from "react";
import { Redirect, useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

import phoneIcon from "../../images/icons/phoneIcon.png";
import clockIcon from "../../images/icons/clockIcon.png";
import incomingCall from "../../images/icons/incomingCall.png";
import outgoingCall from "../../images/icons/outgoingCall.png";
import rejectedCall from "../../images/icons/rejectedCall.png";
import missedCall from "../../images/icons/missedCall.png";
import arrowBack from "../../images/icons/arrowBack.png";
import editContact from "../../images/icons/editContact.png";
import removeContact from "../../images/icons/removeContact.png";

function CallCenterDashBord({ user }) {
  return (
    <div className="callCenterAdd">
      <div className="callCenterAddHide">::</div>
      <div className="callCenterAddCall">
        <form>
          <div className="callCenterAddTitle">ADD CALL</div>
          <div className="callCenterAddCallGroupe">
            <label>Phone Number </label>
            <input
              type="tel"
              pattern="[0-0]{1}[6-7]{1}[0-9]{8}"
              placeholder="(+6-7********)"
            />
          </div>
          <div className="callCenterAddCallDoubleGroup">
            <div className="callCenterAddCallDoubleInput">
              <label>CallType</label>
              <select>
                <option value="">Call Type</option>
                <option value="1">incoming call</option>
                <option value="2">outgoing call</option>
                <option value="3">rejected call</option>
                <option value="4">missed call</option>
              </select>
            </div>
            <div className="callCenterAddCallDoubleInput">
              <label>Duree Dappel</label>
              <input type="text" placeholder="duree dappel with seconds" />
            </div>
          </div>
          <div className="callCenterAddCallGroupe">
            <label>Description</label>
            <textarea
              rows="4"
              cols="50"
              name="description"
              form="callUpdate"
              placeholder="call descreption"
            />
          </div>
          <div className="callCenterAddCallDoubleGroup">
            <div className="callCenterAddCallDoubleInput">
              <label>Date </label>
              <input type="text" placeholder="yyyy-dd-mm" />
            </div>
            <div className="callCenterAddCallDoubleInput">
              <label>Heur </label>
              <input type="text" placeholder="HH-MM" />
            </div>
          </div>
          <div className="CallCenterAddError">this is error</div>
          <div className="CallCenterAddTail">
            <button>Cancel</button>
            <button>Add</button>
          </div>
        </form>
      </div>

      <div className="callCenterAddCall">
        <form>
          <div className="callCenterAddTitle">ADD CONTACT</div>
          <div className="callCenterAddCallGroupe">
            <label>Phone Number </label>
            <input
              type="tel"
              pattern="[0-0]{1}[6-7]{1}[0-9]{8}"
              placeholder="(+6-7********)"
            />
          </div>
          <div className="callCenterAddCallDoubleGroup">
            <div className="callCenterAddCallDoubleInput">
              <label>Nom</label>
              <input placeholder="Nom" />
            </div>
            <div className="callCenterAddCallDoubleInput">
              <label>Prenom</label>
              <input placeholder="Nom" />
            </div>
          </div>
          <div className="callCenterAddCallGroupe">
            <label>Email</label>
            <input placeholder="Email" />
          </div>
          <div className="callCenterAddCallGroupe">
            <label>Societe</label>
            <input placeholder="Societe" />
          </div>
          <div className="CallCenterAddError">this is error</div>
          <div className="CallCenterAddTail">
            <button>Cancel</button>
            <button>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CallCenterDashBord;
