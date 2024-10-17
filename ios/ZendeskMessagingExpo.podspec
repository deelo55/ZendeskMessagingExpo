require 'json'

package = JSON.parse(File.read(File.join(__dir__, '..', 'package.json')))
sdk_version = package["sdkVersions"]["ios"]

Pod::Spec.new do |s|
  s.name           = 'ZendeskMessagingExpo'
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.platforms      = { :ios => '13.4', :tvos => '13.4' }
  s.swift_version  = '5.4'
  s.source         = { git: 'https://github.com/deelo55/zendesk-messaging-expo' }
  s.static_framework = true

  Pod::UI.puts "Zendesk messaging SDK version '#{sdk_version}'"

  if defined?($ZendeskSDKVersion)
    Pod::UI.puts "#{s.name}: Using user specified Zendesk messaging SDK version '#{$ZendeskSDKVersion}'"
    sdk_version = $ZendeskSDKVersion
  end

  s.dependency "ZendeskSDKMessaging"
  s.dependency 'ExpoModulesCore'

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'SWIFT_COMPILATION_MODE' => 'wholemodule'
  }

  s.source_files = "**/*.{h,m,swift}"
end
