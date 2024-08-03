import { Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

// Base URL for API
const apiUrl = import.meta.env.VITE_API_URL;

const App = () => {
  // Add a new job
  const addJob = async (newJob) => {
    const res = await fetch(`${apiUrl}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });
    if (!res.ok) {
      throw new Error('Failed to add job');
    }
    return await res.json();
  };

  // Delete a job
  const deleteJob = async (id) => {
    const res = await fetch(`${apiUrl}/jobs/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      throw new Error('Failed to delete job');
    }
    return await res.json();
  };

  // Update a job
  const updateJob = async (job) => {
    const res = await fetch(`${apiUrl}/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    if (!res.ok) {
      throw new Error('Failed to update job');
    }
    return await res.json();
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob}/>} />
        <Route path="/edit-job/:id" element={<EditJobPage updateJobSubmit={updateJob}/>} loader={jobLoader} />
        <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob}/>} loader={jobLoader} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
