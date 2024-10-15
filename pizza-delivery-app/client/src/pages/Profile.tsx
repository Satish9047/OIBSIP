const Profile = () => {
  return (
    <div className="flex flex-col items-center  gap-5 w-11/12 min-h-[calc(100vh-5rem)] mx-auto">
      <div className="w-full p-4">
        <h2>My Profile</h2>
      </div>
      <div className="flex flex-col items-center justify-between w-11/12 p-4 ">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div>
            <figure>
              <img
                src="/images/pizza1.png"
                alt="profile image"
                className="w-96 "
              />
            </figure>
            <div>
              <h3>Satish Prajapati</h3>
              <p>satishprajapati930@gmail.com</p>
              <div>
                <p>Phone:9840252791</p>
                <p>address: Byasi Bhaktpur</p>
              </div>
            </div>
          </div>
          <div className="w-full p-2">
            <h3>Your Order</h3>
            <div className="px-6 py-4">
              <div className="flex flex-row gap-5">
                <p>Satish Prajapati</p>
                <p>9840252791</p>
                <p>pizza description</p>
                <p>quantity</p>
                <p>deliver</p>
                <p>order time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
