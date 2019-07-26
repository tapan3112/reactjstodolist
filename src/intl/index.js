import React from 'react'
import { connect } from 'react-redux'
import { IntlProvider, addLocaleData } from "react-intl"
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import messages from './messages'
addLocaleData([...en, ...fr])

const Intl = (props) => {
  let { locale, children } = props
  return (
    <IntlProvider locale={locale} messages={messages[locale]} >
      {children}
    </IntlProvider>
  )
}

const mapStateToProps = (state, props) => ({
  locale: state.settings.locale
})
export default connect(mapStateToProps)(Intl)