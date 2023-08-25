export const CognitoErrors = {
  AccessDeniedException: {
    code: '400',
    UiMessage: 'You do not have sufficient access to perform this action.',
  },
  IncompleteSignature: {
    code: '400',
    UiMessage: 'You do not have sufficient access to perform this action.',
  },
  InvalidAction: {
    code: '400',
    UiMessage: 'You do not have sufficient access to perform this action.',
  },
  InvalidParameterCombination: {
    code: '400',
    UiMessage: 'You do not have sufficient access to perform this action.',
  },
  InvalidParameterValue: {
    code: '400',
    UiMessage: 'You do not have sufficient access to perform this action.',
  },
  InvalidQueryParameter: {
    code: '400',
    UiMessage: 'You do not have sufficient access to perform this action.',
  },
  MissingAction: {
    code: '400',
    UiMessage: 'You do not have sufficient access to perform this action.',
  },
  MissingParameter: {
    code: '400',
    UiMessage: 'You do not have sufficient access to perform this action.',
  },
  NotAuthorized: {
    code: '400',
    UiMessage: 'You do not have permission to perform this action.',
  },
  RequestExpired: {
    code: '400',
    UiMessage: 'You do not have sufficient access to perform this action.',
  },
  ThrottlingException: {
    code: '400',
    UiMessage: 'You do not have sufficient access to perform this action.',
  },
  ValidationError: {
    code: '400',
    UiMessage: 'You do not have sufficient access to perform this action.',
  },
  InvalidClientTokenId: {
    code: '403',
    UiMessage: 'You do not have sufficient access to perform this action.',
  },
  MissingAuthenticationToken: {
    code: '403',
    UiMessage: 'You do not have sufficient access to perform this action.',
  },
  OptInRequired: {
    code: '403',
    UiMessage: 'You do not have sufficient access to perform this action.',
  },
  MalformedQueryString: {
    code: '404',
    UiMessage: 'You do not have sufficient access to perform this action.',
  },
  InternalFailure: {
    code: '500',
    UiMessage:
      'The request processing has failed because of an unknown error, exception or failure.',
  },
  ServiceUnavailable: {
    code: '503',
    UiMessage:
      'The request has failed due to a temporary failure of the server.',
  },
  UserNotFoundException: {
    code: '400',
    UiMessage: 'You do not have sufficient access to perform this action.',
  },
};
export default CognitoErrors;
