<?php
/*
Plugin Name: 	BeTheme Header Builder BETA
Description:	Muffin Header Builder for BeTheme. NOTICE: Please follow beta testing best practices and do not test on production systems.
Author:				Muffin group
Author URI:		https://muffingroup.com
Version:			0.9.0.1
*/

if( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
}

define( 'MFN_HB_VERSION', '0.9.0.1' );

if( is_admin() ){

	// Backend ----------

	require_once dirname( __FILE__ ) .'/admin/class-mfn-hb-admin.php';

	function mfn_hb_admin() {
		$Mfn_HB_Admin = new Mfn_HB_Admin();
	}
	add_action( 'init', 'mfn_hb_admin' );

} else {

	// Frontend ----------

	require_once dirname( __FILE__ ) .'/functions/class-mfn-hb-front.php';

	function mfn_hb_front() {
		$Mfn_HB_Front = new Mfn_HB_Front();
	}
	add_action( 'init', 'mfn_hb_front' );

}
