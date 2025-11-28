import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Mail,
  Check,
  X,
  Tag,
  User,
  Calendar,
  Filter,
  Search,
  StickyNote,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { ContactMessage } from "@shared/types";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const statusConfig = {
  new: { label: "New", color: "bg-blue-500", icon: AlertCircle },
  in_progress: { label: "In Progress", color: "bg-yellow-500", icon: Clock },
  resolved: { label: "Resolved", color: "bg-green-500", icon: CheckCircle2 },
  closed: { label: "Closed", color: "bg-gray-500", icon: XCircle },
};

const priorityConfig = {
  low: { label: "Low", color: "bg-gray-400" },
  medium: { label: "Medium", color: "bg-blue-400" },
  high: { label: "High", color: "bg-orange-500" },
  urgent: { label: "Urgent", color: "bg-red-500" },
};

export function MessagesEditor() {
  const { toast } = useToast();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  const { data: messages = [], isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact-messages"],
  });

  const updateMessageMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ContactMessage> }) =>
      apiRequest("PATCH", `/api/contact-messages/${id}`, data),
    onSuccess: () => {
      toast({
        title: "Updated!",
        description: "Message has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contact-messages"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsDetailOpen(true);
    if (!message.isRead) {
      updateMessageMutation.mutate({
        id: message.id,
        data: { isRead: true },
      });
    }
  };

  const handleUpdateMessage = (data: Partial<ContactMessage>) => {
    if (selectedMessage) {
      updateMessageMutation.mutate({
        id: selectedMessage.id,
        data,
      });
      setSelectedMessage({ ...selectedMessage, ...data });
    }
  };

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "all" || message.status === filterStatus;
    const matchesPriority = filterPriority === "all" || message.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const sortedMessages = [...filteredMessages].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const stats = {
    total: messages.length,
    unread: messages.filter((m) => !m.isRead).length,
    new: messages.filter((m) => m.status === "new").length,
    inProgress: messages.filter((m) => m.status === "in_progress").length,
    resolved: messages.filter((m) => m.status === "resolved").length,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-2">CRM - Contact Messages</h1>
        <p className="text-muted-foreground">
          Manage customer inquiries and communications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card className="p-4">
          <div className="text-2xl font-bold text-aurora">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Total Messages</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-500">{stats.unread}</div>
          <div className="text-sm text-muted-foreground">Unread</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-500">{stats.new}</div>
          <div className="text-sm text-muted-foreground">New</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-yellow-500">{stats.inProgress}</div>
          <div className="text-sm text-muted-foreground">In Progress</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-500">{stats.resolved}</div>
          <div className="text-sm text-muted-foreground">Resolved</div>
        </Card>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <div className="space-y-3">
        {sortedMessages.map((message) => {
          const StatusIcon = statusConfig[message.status as keyof typeof statusConfig]?.icon || AlertCircle;
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className={`p-5 cursor-pointer transition-all hover:shadow-md ${
                  !message.isRead ? "border-l-4 border-l-aurora bg-aurora/5" : ""
                }`}
                onClick={() => handleViewMessage(message)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-heading font-bold text-lg truncate">
                        {message.name}
                      </h3>
                      {!message.isRead && (
                        <Badge className="bg-aurora text-white">New</Badge>
                      )}
                      <Badge
                        className={`${
                          statusConfig[message.status as keyof typeof statusConfig]?.color
                        } text-white`}
                      >
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig[message.status as keyof typeof statusConfig]?.label}
                      </Badge>
                      <Badge
                        className={`${
                          priorityConfig[message.priority as keyof typeof priorityConfig]?.color
                        } text-white`}
                      >
                        {priorityConfig[message.priority as keyof typeof priorityConfig]?.label}
                      </Badge>
                      {message.tags && (
                        <div className="flex gap-1">
                          {message.tags.split(",").map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tag.trim()}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{message.email}</p>
                    <h4 className="font-semibold mb-2">{message.subject}</h4>
                    <p className="text-sm text-foreground line-clamp-2">{message.message}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(message.createdAt).toLocaleString()}
                      </span>
                      {message.assignedTo && (
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {message.assignedTo}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
        {sortedMessages.length === 0 && (
          <Card className="p-12 text-center">
            <Mail className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchQuery || filterStatus !== "all" || filterPriority !== "all"
                ? "No messages match your filters"
                : "No messages yet"}
            </p>
          </Card>
        )}
      </div>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold">From</Label>
                  <p className="text-sm mt-1">{selectedMessage.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-semibold">Received</Label>
                  <p className="text-sm mt-1">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-sm font-semibold">Subject</Label>
                <p className="text-sm mt-1">{selectedMessage.subject}</p>
              </div>

              <div>
                <Label className="text-sm font-semibold">Message</Label>
                <div className="mt-2 p-4 bg-muted rounded-md">
                  <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Status</Label>
                  <Select
                    value={selectedMessage.status}
                    onValueChange={(value) => handleUpdateMessage({ status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Priority</Label>
                  <Select
                    value={selectedMessage.priority}
                    onValueChange={(value) => handleUpdateMessage({ priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">Assigned To</Label>
                <Input
                  placeholder="Assign to team member..."
                  value={selectedMessage.assignedTo || ""}
                  onChange={(e) => handleUpdateMessage({ assignedTo: e.target.value })}
                />
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">Tags (comma-separated)</Label>
                <Input
                  placeholder="e.g., inquiry, support, partnership"
                  value={selectedMessage.tags || ""}
                  onChange={(e) => handleUpdateMessage({ tags: e.target.value })}
                />
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">Internal Notes</Label>
                <Textarea
                  placeholder="Add notes about this message..."
                  value={selectedMessage.notes || ""}
                  onChange={(e) => handleUpdateMessage({ notes: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDetailOpen(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    toast({
                      title: "Email Client",
                      description: `Opening email to ${selectedMessage.email}`,
                    });
                    window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`;
                  }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Reply via Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
