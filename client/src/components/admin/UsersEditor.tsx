import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users as UsersIcon, UserPlus, Shield } from "lucide-react";
import { motion } from "framer-motion";

export function UsersEditor() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-2">Users Management</h1>
        <p className="text-muted-foreground">Manage admin users and permissions</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-12 text-center">
          <div className="inline-flex p-6 bg-aurora/10 rounded-full mb-4">
            <UsersIcon className="h-16 w-16 text-aurora" />
          </div>
          <h2 className="text-2xl font-heading font-bold mb-3">User Management</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            User authentication and management system is currently in development.
            This will allow you to manage admin accounts, set permissions, and control access levels.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-aurora hover:bg-aurora/90" disabled>
              <UserPlus className="mr-2 h-4 w-4" />
              Add New User
            </Button>
            <Button variant="outline" disabled>
              <Shield className="mr-2 h-4 w-4" />
              Manage Roles
            </Button>
          </div>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg max-w-lg mx-auto">
            <h3 className="font-semibold mb-2 text-sm">Coming Soon Features:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Create and manage admin accounts</li>
              <li>• Role-based access control (Admin, Editor, Viewer)</li>
              <li>• Activity logging and audit trails</li>
              <li>• Two-factor authentication</li>
            </ul>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
