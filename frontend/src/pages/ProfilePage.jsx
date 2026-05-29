function ProfilePage() {
  const token = localStorage.getItem("token");

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      <p>
        <strong>Status:</strong>{" "}
        {token ? "Logged In" : "Not Logged In"}
      </p>

      <p className="mt-3">
        Welcome to the Online Library Platform.
      </p>
    </div>
  );
}

export default ProfilePage;