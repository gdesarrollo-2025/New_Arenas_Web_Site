// components/HubspotForm.js
import { useEffect, useRef } from 'react';

export default function HubspotForm({ visible }) {
  const formRef = useRef(null);

  useEffect(() => {
    const loadHubspotForm = () => {
      if (window.hbspt && formRef.current && formRef.current.children.length === 0) {
        window.hbspt.forms.create({
          portalId: '8765689',
          formId: 'f8ef6b77-a58b-44de-96ac-33827fb3e8ee',
          region: 'na1',
          target: '#hubspot-form-container',
        });
      }
    };

    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.async = true;
    script.onload = loadHubspotForm;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="hubspot-form-container"
      ref={formRef}
      className={`overflow-hidden container-custom  items-center  px-12 sm:px-14 md:px-20 lg:px-35 py-10 transition-all duration-300 ease-in-out
        ${visible ? 'max-h-250 opacity-100':'max-h-0 opacity-0'}`}
    />
  );
}
