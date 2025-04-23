import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Share,
  Modal,
  Image,
} from 'react-native';
import { Task } from '../types/Task';
import { useTaskStore } from '../store/useTaskStore';

interface Props {
  task: Task;
}

const TaskItem: React.FC<Props> = ({ task }) => {
  const { deleteTask, updateTask } = useTaskStore();
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = () => {
    deleteTask(task.id);
    setShowDeleteModal(false);
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      updateTask(task.id, editTitle, editDescription);
      setShowEditModal(false);
    }
  };

  const handleShare = async (platform: string) => {
    const message = `${task.title}: ${task.description}`;
    await Share.share({
      message: `[${platform}] ${message}`,
    });
    setShowShareOptions(false);
  };

  const formattedDate = new Date(task.createdAt).toLocaleString();

  return (
    <View>
      {/* Task Card */}
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.8}
        style={styles.card}
      >
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>

        {/* Close Button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setShowDeleteModal(true)}
        >
          <Image source={require('../images/close.png')} style={styles.iconImage} />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Action Icons */}
      {expanded && (
        <View style={styles.actionBox}>
          <TouchableOpacity onPress={() => setShowShareOptions(!showShareOptions)} style={styles.iconButton}>
            <Image source={require('../images/share.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowInfo(!showInfo)} style={styles.iconButton}>
            <Image source={require('../images/info.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowEditModal(true)} style={styles.iconButton}>
            <Image source={require('../images/edit.png')} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      )}

      {showShareOptions && (
  <View style={styles.shareBar}>
    <TouchableOpacity onPress={() => handleShare('Copy')}>
      <Image source={require('../images/copy.png')} style={styles.shareIcon} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleShare('VK')}>
      <Image source={require('../images/vk.png')} style={styles.shareIcon} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleShare('Telegram')}>
      <Image source={require('../images/telegram.png')} style={styles.shareIcon} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleShare('WhatsApp')}>
      <Image source={require('../images/whatsapp.png')} style={styles.shareIcon} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleShare('Facebook')}>
      <Image source={require('../images/facebook.png')} style={styles.shareIcon} />
    </TouchableOpacity>
  </View>
)}


      {showInfo && <Text style={styles.infoText}>Created: {formattedDate}</Text>}

      {/* Delete Confirmation Modal */}
      <Modal
        transparent
        visible={showDeleteModal}
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Delete this task?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalButton} onPress={handleDelete}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#2C2B29' }]}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal
        transparent
        visible={showEditModal}
        animationType="fade"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editModalBox}>
            <TextInput
              style={styles.input}
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="Mini Input..."
              placeholderTextColor="#FF8303"
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              value={editDescription}
              onChangeText={setEditDescription}
              placeholder="Max Input..."
              placeholderTextColor="#FF8303"
              multiline
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#2C2B29' }]}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1F1E1B',
    borderRadius: 8,
    padding: 12,
    paddingRight: 38,
    borderWidth: 1.2,
    borderColor: '#FF8303',
    position: 'relative',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F0E3CA',
  },
  description: {
    fontSize: 13,
    color: '#F0E3CA',
    marginTop: 4,
  },
  deleteButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    padding: 4,
  },
  actionBox: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 6,
    gap: 8,
  },
  iconButton: {
    backgroundColor: '#2C2B29',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FF8303',
  },
  shareBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#1F1E1B',
    borderTopWidth: 1,
    borderColor: '#FF8303',
    paddingVertical: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  shareIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  
  iconImage: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  infoText: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#1F1E1B',
    padding: 20,
    borderRadius: 8,
    borderColor: '#FF8303',
    borderWidth: 1,
    alignItems: 'center',
  },
  editModalBox: {
    backgroundColor: '#1F1E1B',
    padding: 20,
    borderRadius: 8,
    borderColor: '#FF8303',
    borderWidth: 1,
    width: '90%',
  },
  modalText: {
    color: '#F0E3CA',
    fontSize: 16,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#FF8303',
    borderRadius: 6,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: '#F0E3CA',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF8303',
    borderRadius: 6,
    padding: 10,
    color: '#F0E3CA',
    marginBottom: 10,
    backgroundColor: '#1F1E1B',
  },
});

export default TaskItem;
