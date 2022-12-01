interface Props {
  title: string;
  content: string;
}
const ProfileItem = ({ title, content }: Props) => {
  return (
    <div className="flex flex-col p-3 py-4">
      <p className="pb-1 font-notoSans font-light">{title}</p>
      <p className="font-notoSans font-thin text-sm text-gray-500">{content}</p>
    </div>
  );
};

export default ProfileItem;
