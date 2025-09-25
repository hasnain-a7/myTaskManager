import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eye, FileText } from "lucide-react";
import { useState } from "react";
import TaskDetailModal from "./TrelloDetailPage";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import type { Task } from "@/TaskContext/TaskContext";
import { useTaskContext } from "@/TaskContext/TaskContext";
import TodoModel from "./TodoModel";
const TaskDetailsAccordion = ({
  task,
  projectTitle,
  handleShowPop,
  showPopup,
}: {
  task: Task & { dueDate: string };
  projectTitle: string;
  handleShowPop: (a: boolean) => void;
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setshowEdit] = useState(false);
  const { deleteTaskFromProject } = useTaskContext();

  const handleEditClick = () => {
    handleShowPop(true);
  };
  const handleDelChange = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this task?")) {
        await deleteTaskFromProject(
          projectTitle,
          task.userId ?? null,
          task.id ?? ""
        );
      }
    } catch (error) {
      console.log("err: ", error);
    }
  };

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value={`task-${task.id}`}
          className="border-b last:border-b-0 cursor-pointer"
        >
          <AccordionTrigger className="hover:no-underline px-3 py-1">
            <div className="flex items-center w-full cursor-pointer">
              <div className="w-2 h-2 rounded-full bg-cyan-400 mr-3" />
              <span className="flex w-full text-sm font-medium justify-between truncate">
                {task.title?.split(" ").slice(0, 4).join(" ")}
              </span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="p-2">
            <div className="w-full rounded-lg bg-muted p-3 relative">
              <div className="flex">
                <div className="space-y-4 ">
                  <div className="w-full ">
                    <div className="flex justify-between items-center mb-2 ">
                      <div className="flex  gap-0.5">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Description
                        </p>
                      </div>
                    </div>

                    <p className="text-sm w-full text-foreground/80 line-clamp-3">
                      {task.todo}
                    </p>
                  </div>
                </div>
              </div>
              <Eye
                size={20}
                onClick={() => setShowDetail(!showDetail)}
                className="absolute top-2 right-2"
              />
              <FaEdit
                size={16}
                onClick={handleEditClick}
                className="absolute top-2 right-14"
              />
              <MdDeleteOutline
                size={18}
                className="absolute top-2 right-8"
                onClick={handleDelChange}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {showDetail && (
        <TaskDetailModal task={task} onClose={() => setShowDetail(false)} />
      )}
      {showPopup && (
        <TodoModel
          taskToEdit={task}
          projectTitle={projectTitle}
          showPopup={showPopup}
        />
      )}
    </>
  );
};

export default TaskDetailsAccordion;
