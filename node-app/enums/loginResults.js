const LoginResult = Object.freeze({
  EmailNotFound: 'email_not_found',
  PasswordMismatch: 'password_not_matching',
  Success: 'matching_email_and_password_found',
})

const SignupResult = Object.freeze({
  EmailAlreadyUsed: 'email_is_already_in_use',
  Success: 'new_user_created',
  ArtistCreated: 'new_artist_created',
  ArtistCreationFailed: 'failed_to_create_artist',
  VendeeCreated: 'new_vendee_created',
  VendeeCreationFailure: 'failed_to_create_vandee',
  UserCreationFailure: 'failed_to_create_user'
})

module.exports = { LoginResult, SignupResult }