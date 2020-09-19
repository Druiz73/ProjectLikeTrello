import React from 'react';
import { withRouter } from 'react-router-dom';
import { BsPlus } from 'react-icons/bs';
import { BsFillPersonPlusFill } from 'react-icons/bs';
//Styles
import './CardCompany.css'
import { useTranslation } from 'react-i18next';

const CardCompany = ({ organization, history, joinOrganization }) => {

  const { t } = useTranslation();

  return (
    <div 
      className="card mb-3 cursor-card shadow-card" 
      onClick={() => {
        if(organization) {
          history.push(`/dashboard/${organization._id}`)
        } else if(joinOrganization) {
          history.push('/join-organization')
        } else {
          history.push('/create-organization')
        }
      }}
    >
      <div className="row no-gutters py-1">
        <div className="col-md-3 d-flex justify-content-center align-items-center">
          { organization 
          ? 
            <img src={organization.photo} className="logo-image" alt="No se encontró la imagen" />
          : ( joinOrganization 
            ? <BsFillPersonPlusFill size="2em" className="card-img" title={t("JoinOrganizationTitle")} /> 
            : <BsPlus size="2em" className="card-img" title={t("CardCompanyLabel")} />
            )
          }
        </div>
        <div className="col-md-9">
          <div className="card-body text-center padding-phone">
            { organization 
              ? <h5 className="card-title-size card-title text-center m-0">{organization.name}</h5>
              : (
                joinOrganization
                  ? <h5 className="card-title-size card-title text-center m-0">{t("JoinOrganizationTitle")}</h5>
                  : <h5 className="card-title-size card-title text-center m-0">{t("CardCompanyLabel")}</h5>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default withRouter(CardCompany);