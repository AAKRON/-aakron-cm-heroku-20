import React from 'react';
import PropTypes from 'prop-types';

const PriceField = ({ source, record = {} }) => <span>${record[source]}</span>;

PriceField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export default PriceField;
