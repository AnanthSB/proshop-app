import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary } from 'react-error-boundary';

// Your App component wrapped with ErrorBoundary
export default function App() {
	return (
		<ErrorBoundary fallback={ErrorFallback}>
			<Header />
			<main className="py-3">
				<Container>
					<Outlet />
				</Container>
			</main>
			<Footer />
			<ToastContainer />
		</ErrorBoundary>
	);
}

// Fall back UI when error is caught
const ErrorFallback = ({ error, resetErrorBoundary }) => {
	return (
		<div role="alert">
			<h2>Something went wrong:</h2>
			<pre>{error?.message}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	);
};
