import { useParams } from 'react-router-dom';
import { Button, Table } from 'antd'; // Import Ant Design Table
import coursesData from '../../../data/courses.json';
import reviewsData from '../../../data/reviews.json'; // Import reviews data
import usersData from '../../../data/users.json'; // Import users data

const ReviewsDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = coursesData.courses.find(course => course.id === courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  // Filter reviews for the specific course
  const courseReviews = reviewsData.reviews.filter(review => review.course_id === courseId);

  // Map user IDs to user names
  const userIdToNameMap = usersData.users.reduce((map: { [key: string]: string }, user: { id: string; name: string }) => {
    map[user.id] = user.name;
    return map;
  }, {});

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: 'Reviewer', // Updated title
      dataIndex: 'user_id',
      key: 'user_id',
      render: (userId: string) => userIdToNameMap[userId] || 'Unknown User', // Use render to map user_id to name
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
  ];

  return (
    <div>
      <Table dataSource={courseReviews} columns={columns} rowKey="id" />
      <Button type="primary" onClick={() => history.back()} className='bg-gradient-tone text-white'>
        Back
      </Button>
    </div>
  );
};

export default ReviewsDetail;
