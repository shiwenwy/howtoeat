import 'react-quill/dist/quill.snow.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'simplebar-react/dist/simplebar.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Head from 'next/head';
import { Provider as ReduxProvider } from 'react-redux';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth/jwt';
import { store } from 'src/store';
// Remove if locales are not used
import 'src/locales/i18n';


const CustomApp = (props) => {
  const { Component } = props;

  return (
    <>
      <Head>
        <title>
          Devias Kit PRO
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <ReduxProvider store={store}>
        <Component />
      </ReduxProvider>
    </>
  );
};

export default CustomApp;
