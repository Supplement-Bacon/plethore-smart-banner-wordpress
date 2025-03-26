<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://github.com/supplement-bacon/plethore-smart-banner
 * @package           Plethore_Smart_Banner
 * @author			  Samuel Hassid
 *
 * @wordpress-plugin
 * Plugin Name:       Plethore Smart Banner
 * Description:       Display a smart banner on your website to promote your mobile app.
 * Version:           0.0.1
 * Requires PHP:      7.4.0
 * Author:            Plethore
 * Author URI:        https://supplement-bacon.com
 * Text Domain:       plethore-smart-banner
 * Domain Path:       /plethore-smart-banner
 */

use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

// If this file is called directly, abort.
if (! defined('WPINC')) {
    die;
}


class Plethore_Smart_Banner
{
    const SETTING_ACCOUNT_SLUG = 'plethore_smart_banner_account_slug';
    const BANNER_DATA_URL = 'https://smart-banner.pletho.re/';

    protected static $instance = null;

    public static function get_instance()
    {
        if (! isset(static::$instance)) {
            static::$instance = new static;
        }

        return static::$instance;
    }

    protected function __construct()
    {
        $this->register_self_update();
        $this->register_settings_page();
        $this->register_banner_injector();
    }

    private function register_self_update()
    {
        require 'plugin-update-checker/plugin-update-checker.php';

        PucFactory::buildUpdateChecker(
            // TODO: Replace the URL with the actual URL of the update checker
            'https://cafoutche.supplement-bacon.agency/wordpress/plethore-smart-banner.json',
            __FILE__, //Full path to the main plugin file or functions.php.
            'plethore-smart-banner'
        );
    }

    private function register_settings_page()
    {
        require 'settings-page.php';
        add_action('admin_menu', 'plethore_smart_banner_register_settings_page');
    }

    private function register_banner_injector()
    {
        require 'banner-injector.php';
    }
}

add_action('init', 'plethore_smart_banner_init');

function plethore_smart_banner_init()
{
    Plethore_Smart_Banner::get_instance();
}
