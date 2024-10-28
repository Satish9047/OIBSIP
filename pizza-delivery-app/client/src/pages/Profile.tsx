import { useGetUserQuery } from "../redux/api/apiServices";

const Profile = () => {
  const { data } = useGetUserQuery();
  return (
    <div className="flex flex-col items-center md:w-full gap-5 min-h-[calc(100vh-5rem)] ">
      <div className="w-full p-4">
        <h2>My Profile</h2>
      </div>
      <div className="flex flex-col items-center w-full p-4 ">
        <div className="flex flex-col gap-12 md:flex-row">
          <aside className="flex flex-col gap-12 md:flex-row">
            <figure>
              <img
                src="/images/pizza1.png"
                alt="profile image"
                className="w-96 "
              />
            </figure>
            <div className="flex flex-col justify-center gap-4">
              <div className="flex flex-row gap-2">
                <img
                  src="/icon/profile.svg"
                  width={20}
                  height={20}
                  alt="profile"
                />
                <h3>{data?.data?.name}</h3>
              </div>
              <div className="flex flex-row gap-2">
                <img src="/icon/email.svg" width={20} height={20} alt="email" />
                <p>{data?.data?.email}</p>
              </div>
              <div className="flex flex-row gap-2">
                <img src="/icon/phone.svg" width={20} height={20} alt="phone" />
                <p>{data?.data?.phone}</p>
              </div>
              <div className="flex flex-row gap-2">
                <img
                  src="/icon/address.svg"
                  width={20}
                  height={20}
                  alt="location"
                />
                <p>{data?.data?.address}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Profile;
