import React, { useState } from 'react';

function PrivacySettingsPopup({ t, show, closePopup }) {
    const [showExpandElement, setShowExpandElement] = useState({ first: false, second: false });
    return (
        show && (
            <div className="reveal-overlay" style={{ display: 'block' }}>
                <div className="reveal" id="modal-cookies" style={{ display: 'block', top: '5px' }}>
                    <h3><strong>{t('cookie_headline')}</strong></h3>
                    <div className="grid-x grid-margin-x">
                        <div className="cell">
                            <p className="text-small less-line-height" dangerouslySetInnerHTML={{ __html: t('cookie_description') }}></p>  </div>
                        <div className={`cell ${showExpandElement.first ? 'expanded' : ''}`} id="expand1">
                            <input type="checkbox" id="cookie_necessary" disabled checked />
                            <label >{t('cookie_label_necessary')}</label>
                            <a onClick={() => setShowExpandElement({ first: !showExpandElement.first, second: showExpandElement.second })}><span className="entypo-down-open"></span></a>
                            <p className="text-small less-line-height">{t('cookie_description_necessary')}</p>
                        </div>
                        <div className={`cell ${showExpandElement.second ? 'expanded' : ''}`} id="expand2">
                            <input type="checkbox" id="cookie_analyse" />
                            <label >{t('cookie_label_analysis')}</label>
                            <a onClick={() => setShowExpandElement({ first: showExpandElement.first, second: !showExpandElement.second })}><span className="entypo-down-open"></span></a>
                            <p className="text-small less-line-height">{t('cookie_description_analysis')}</p>
                            <textarea className="script hide"></textarea>
                        </div>
                        <div className="cell medium-6">
                            <p><a className="button grey fullsize" onClick={closePopup}>{t('cookie_btn_save_selection')}<span className="icon-arrow-right"></span></a></p>
                        </div>
                        <div className="cell medium-6">
                            <p><a className="button all fullsize" onClick={closePopup}>{t('cookie_btn_accept_all')}<span className="icon-arrow-right"></span></a></p>
                        </div>
                    </div>
                    <button className="close-button" onClick={closePopup} type="button">
                        <span>×</span>
                    </button>
                </div>
            </div>
        )
    )
}

export default PrivacySettingsPopup;
