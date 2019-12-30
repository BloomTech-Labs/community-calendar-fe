export const useAuth0 = jest.fn(() => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  loginWithRedirect: jest.fn(),
  logout: jest.fn(),
}))
