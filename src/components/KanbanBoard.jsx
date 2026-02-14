import React, { useState } from 'react';
import { Card, Button, Tag, Avatar, Progress, Modal, Form, Input, Select, message, Space, Dropdown } from 'antd';
import { 
  PlusOutlined, 
  UserOutlined,
  ClockCircleOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  FlagOutlined
} from '@ant-design/icons';

const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    backlog: {
      id: 'backlog',
      title: 'To Do',
      color: '#8c8c8c',
      tasks: [
        { id: '1', title: 'Research competitor OKRs', priority: 'medium', assignee: 'Sarah', dueDate: '2024-02-20', progress: 0 },
        { id: '2', title: 'Define Q2 objectives', priority: 'high', assignee: 'Mike', dueDate: '2024-02-25', progress: 0 },
      ]
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      color: '#1890ff',
      tasks: [
        { id: '3', title: 'Implement OKR dashboard', priority: 'high', assignee: 'Alex', dueDate: '2024-02-15', progress: 65 },
        { id: '4', title: 'Customer feedback analysis', priority: 'medium', assignee: 'Sarah', dueDate: '2024-02-18', progress: 30 },
      ]
    },
    review: {
      id: 'review',
      title: 'Review',
      color: '#faad14',
      tasks: [
        { id: '5', title: 'Q1 OKR presentation', priority: 'high', assignee: 'John', dueDate: '2024-02-10', progress: 90 },
      ]
    },
    completed: {
      id: 'completed',
      title: 'Completed',
      color: '#52c41a',
      tasks: [
        { id: '6', title: 'Setup OKR framework', priority: 'high', assignee: 'Team', dueDate: '2024-02-01', progress: 100 },
      ]
    }
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentColumn, setCurrentColumn] = useState('backlog');
  const [form] = Form.useForm();

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'blue';
    }
  };

  const handleAddTask = (columnId) => {
    setCurrentColumn(columnId);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleTaskSubmit = (values) => {
    const newTask = {
      id: Date.now().toString(),
      title: values.title,
      priority: values.priority,
      assignee: values.assignee,
      dueDate: values.dueDate,
      progress: 0
    };

    setColumns(prev => ({
      ...prev,
      [currentColumn]: {
        ...prev[currentColumn],
        tasks: [newTask, ...prev[currentColumn].tasks]
      }
    }));

    setIsModalVisible(false);
    message.success('Task created successfully');
  };

  const handleDeleteTask = (columnId, taskId) => {
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: prev[columnId].tasks.filter(task => task.id !== taskId)
      }
    }));
    message.success('Task deleted');
  };

  // Drag and Drop handlers
  const handleDragStart = (e, task, sourceColumnId) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.setData('sourceColumnId', sourceColumnId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    
    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');
    
    if (!taskId || !sourceColumnId) return;
    if (sourceColumnId === targetColumnId) return;

    const sourceColumn = columns[sourceColumnId];
    const task = sourceColumn.tasks.find(t => t.id === taskId);
    
    if (!task) return;

    const updatedSourceTasks = sourceColumn.tasks.filter(t => t.id !== taskId);
    const updatedTask = { ...task };
    
    if (targetColumnId === 'completed') {
      updatedTask.progress = 100;
    } else if (targetColumnId === 'in-progress' && updatedTask.progress === 0) {
      updatedTask.progress = 25;
    } else if (targetColumnId === 'review' && updatedTask.progress < 90) {
      updatedTask.progress = 90;
    }

    const targetColumn = columns[targetColumnId];
    const updatedTargetTasks = [...targetColumn.tasks, updatedTask];

    setColumns({
      ...columns,
      [sourceColumnId]: {
        ...sourceColumn,
        tasks: updatedSourceTasks
      },
      [targetColumnId]: {
        ...targetColumn,
        tasks: updatedTargetTasks
      }
    });

    message.success(`Task moved to ${targetColumn.title}`);
  };

  const getTaskActions = (columnId, task) => [
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: 'Edit',
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: 'Delete',
      onClick: () => handleDeleteTask(columnId, task.id),
    },
  ];

  return (
    <div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: 16,
        overflowX: 'auto'
      }}>
        {Object.values(columns).map(column => (
          <div 
            key={column.id} 
            style={{ 
              background: '#fafafa', 
              borderRadius: 8, 
              padding: 16,
              minWidth: 280,
              display: 'flex',
              flexDirection: 'column',
              height: 'fit-content',
              maxHeight: 'calc(100vh - 300px)'
            }}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: 16 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: 4, 
                  background: column.color 
                }} />
                <h3 style={{ margin: 0, fontWeight: 600 }}>{column.title}</h3>
                <Tag>{column.tasks.length}</Tag>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              minHeight: 100,
              maxHeight: 'calc(100vh - 380px)',
              overflowY: 'auto',
              padding: '4px 2px'
            }}>
              {column.tasks.map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, column.id)}
                  style={{
                    cursor: 'grab'
                  }}
                >
                  <Card 
                    size="small"
                    style={{ 
                      boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                      border: '1px solid #f0f0f0'
                    }}
                    hoverable
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{task.title}</h4>
                        <Dropdown 
                          menu={{ items: getTaskActions(column.id, task) }} 
                          trigger={['click']}
                        >
                          <Button 
                            type="text" 
                            icon={<MoreOutlined />} 
                            size="small"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </Dropdown>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FlagOutlined style={{ color: getPriorityColor(task.priority) }} />
                        <Tag color={getPriorityColor(task.priority)} style={{ margin: 0 }}>
                          {task.priority}
                        </Tag>
                      </div>
                      
                      {task.progress > 0 && task.progress < 100 && (
                        <div>
                          <Progress percent={task.progress} size="small" showInfo={false} />
                        </div>
                      )}

                      {task.progress === 100 && (
                        <Tag color="success" style={{ width: 'fit-content' }}>Completed</Tag>
                      )}

                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        fontSize: 12,
                        color: '#8c8c8c'
                      }}>
                        <Space size={4}>
                          <Avatar size="small" icon={<UserOutlined />} />
                          <span>{task.assignee}</span>
                        </Space>
                        <Space size={4}>
                          <ClockCircleOutlined />
                          <span>{task.dueDate}</span>
                        </Space>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            <Button 
              type="dashed" 
              block 
              icon={<PlusOutlined />}
              onClick={() => handleAddTask(column.id)}
              style={{ marginTop: 16 }}
            >
              Add Task
            </Button>
          </div>
        ))}
      </div>

      <Modal
        title="Create New Task"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleTaskSubmit}
        >
          <Form.Item
            name="title"
            label="Task Title"
            rules={[{ required: true, message: 'Please enter task title' }]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: 'Please select priority' }]}
          >
            <Select placeholder="Select priority">
              <Select.Option value="high">High</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="low">Low</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="assignee"
            label="Assignee"
            rules={[{ required: true, message: 'Please select assignee' }]}
          >
            <Select placeholder="Select assignee">
              <Select.Option value="Sarah">Sarah Chen</Select.Option>
              <Select.Option value="Mike">Mike Johnson</Select.Option>
              <Select.Option value="Alex">Alex Rivera</Select.Option>
              <Select.Option value="John">John Smith</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: 'Please select due date' }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Create Task
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default KanbanBoard;