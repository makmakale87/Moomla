const modelsPath = MODELS + '/shop';

module.exports = {
   shop               : require( modelsPath + '/shop' ),
   other              : require( modelsPath + '/other' ),
   config             : require( modelsPath + '/config' ),
   categories         : require( modelsPath + '/categories' ),
   products           : require( modelsPath + '/products' ),
   manufacturers      : require( modelsPath + '/manufacturers' ),
   currencies         : require( modelsPath + '/currencies' ),
   taxes              : require( modelsPath + '/taxes' ),
   units              : require( modelsPath + '/units' ),
   productfields      : require( modelsPath + '/productfields' ),
   productgroups      : require( modelsPath + '/productgroups' ),
   productfieldvalues : require( modelsPath + '/productfieldsvalues' ),
   productlabels      : require( modelsPath + '/productlabels' ),
   deliverytimes      : require( modelsPath + '/deliverytimes' ),
   languages          : require( modelsPath + '/languages' ),
   orderstatus        : require( modelsPath + '/orderstatus' ),
   payments           : require( modelsPath + '/payments' ),
   coupons            : require( modelsPath + '/coupons' )
};